import { useFormContext, useWatch } from 'react-hook-form';
import { Field } from '@components/HookForm';
import { Input } from '@components/Fields';
import { X } from 'lucide-react';
import { Button } from '@components';

const TagInput = ({
  inputName,
  listName,
  placeholder = 'Type and press enter...',
  validateItem,
}) => {
  const { getValues, setValue } = useFormContext();
  const values = useWatch();
  const inputValue = values?.[inputName] || '';
  const items = values?.[listName] || [];

  const addItem = () => {
    const trimmed = (inputValue || '').trim();
    if (!trimmed) return;
    if (validateItem && !validateItem(trimmed)) return;
    setValue(listName, [...items, trimmed], { shouldDirty: true });
    setValue(inputName, '', { shouldDirty: true });
  };

  const removeItem = (idx) => {
    const next = (getValues(listName) || []).filter((_, i) => i !== idx);
    setValue(listName, next, { shouldDirty: true });
  };

  return (
    <div>
      <Field
        as={Input}
        name={inputName}
        placeholder={placeholder}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            addItem();
          }
        }}
      />
      {items.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {items.map((t, idx) => (
            <span
              key={`${t}-${idx}`}
              className="inline-flex items-center gap-1 rounded-full bg-gray-200 px-2 py-1 text-xs text-gray-700"
            >
              {t}
              <Button className="rounded p-0.5 hover:bg-gray-300" onClick={() => removeItem(idx)}>
                <X className="h-3 w-3" />
              </Button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default TagInput;
