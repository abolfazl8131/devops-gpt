import { FC, useState } from 'react';
import { Plus, Trash2, ChevronDown } from 'lucide-react';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormWrapper } from '@/components/form/form-wrapper';
import { FormInput } from '@/components/form/form-input';
import { DockerComposeSchema } from './docker-compose.type';
import { cn } from '@/lib/utils';

const DockerCompose: FC = () => {
  const [openService, setOpenService] = useState<number | null>(0);

  const defaultValues = {
    version: '3',
    services: [
      {
        name: 'web',
        build: {
          args: { foo: 'bar' },
          context: '.',
          dockerfile: 'DockerFile',
        },
        command: 'command...',
        container_name: 'web_server',
        depends_on: ['service 0'],
        environment: { foo: 'bar' },
        image: 'nginx:latest',
        networks: ['app_network'],
        ports: ['80:80'],
        volumes: ['./foo:bar'],
      },
    ],
    networks: {
      app_network: {
        driver: 'bridge',
      },
    },
  };

  const methods = useForm({
    resolver: zodResolver(DockerComposeSchema),
    defaultValues,
  });

  const { control } = methods;

  const {
    fields: services,
    append,
    remove,
  } = useFieldArray({
    control,
    name: 'services',
  });

  const handleAddService = () => {
    append({
      name: '',
      build: {
        args: {},
        context: '',
        dockerfile: '',
      },
      command: '',
      container_name: '',
      depends_on: [''],
      environment: {},
      image: '',
      networks: [''],
      ports: [''],
      volumes: [''],
    });
  };

  const handleRemoveService = (index: number) => {
    remove(index);
  };

  const handleSubmit = async (data: DockerComposeSchema) => {
    console.log(data);
  };

  return (
    <div className="flex h-[calc(100%-56px)] w-full justify-center overflow-y-auto p-4 text-black-1 scrollbar-thin dark:text-white">
      <div className="h-full w-full max-w-[768px]">
        <FormWrapper methods={methods} onSubmit={handleSubmit}>
          <div className="mb-4 flex w-full flex-col">
            <FormInput label="Version" name="version" placeholder="3" />
          </div>

          <div className="mb-4 flex items-center">
            <h1 className="text-2xl font-bold">Services</h1>
            <button
              type="button"
              onClick={handleAddService}
              className="btn btn-xs ml-4"
            >
              Add <Plus className="size-3" />
            </button>
          </div>

          <div className="space-y-4">
            {services.map((service, index) => (
              <div
                key={service.id}
                className="w-full rounded-md border border-gray-500 p-5"
              >
                <div
                  className={cn(
                    'flex items-center justify-between transition-all delay-200',
                    {
                      'mb-7': openService === index,
                    },
                  )}
                >
                  <p className="font-semibold">Service #{index + 1}</p>
                  <div className="flex items-center gap-2">
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveService(index)}
                      >
                        <Trash2 className="size-4" />
                      </button>
                    )}
                    <ChevronDown
                      className={cn('cursor-pointer transition-all', {
                        'rotate-180': openService === index,
                      })}
                      onClick={() =>
                        setOpenService(openService === index ? -1 : index)
                      }
                    />
                  </div>
                </div>
                <div
                  className={cn(
                    'h-full max-h-0 overflow-hidden px-1 transition-all duration-500',
                    {
                      'max-h-[1000px]': openService === index,
                    },
                  )}
                >
                  <div className="mb-4 flex flex-col">
                    <FormInput
                      id="service_name"
                      name={`services.${index}.name`}
                      label="Name"
                      placeholder="web"
                    />
                  </div>
                  <div className="mb-4 flex flex-col">
                    <FormInput
                      id="image"
                      name={`services.${index}.image`}
                      label="Image"
                      placeholder="image"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </FormWrapper>
      </div>
    </div>
  );
};

export default DockerCompose;
