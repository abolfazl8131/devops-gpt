import { useFormContext } from "react-hook-form";
import { BasicGenFields, BugFixFields } from "../../features/constants";
import { validateForm } from "../../utils/formValidator";

interface Props {
  fieldName: string;
  label?: string;
  placeholder?: string;
}

const Input = ({ fieldName, label, placeholder = "Placeholder" }: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const showTextArea =
    fieldName === BasicGenFields.INPUT ||
    fieldName === BugFixFields.BUG_DESCRIPTION;

  const defaultStyle =
    "border border-stone-600 bg-stone-900 rounded-md flex h-auto p-4";

  const error = errors[fieldName];
  return (
    <div>
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      {!showTextArea ? (
        <input
          className={defaultStyle}
          {...register(fieldName, validateForm(fieldName))}
          placeholder={placeholder}
        />
      ) : (
        <textarea
          className={`overflow-y-auto w-[50rem] ${defaultStyle}`}
          {...register(fieldName, validateForm(fieldName))}
          placeholder={placeholder}
        />
      )}
      {error && (
        <p className="text-red-600 text-sm">{error?.message as string}</p>
      )}
    </div>
  );
};

export default Input;
