import { Field } from '@components/HookForm';
import { Input, TextArea } from '@components/Fields';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { Plus, Trash2, User } from 'lucide-react';
import { Button } from '@components';

const PaperMetadata = () => {
  const {
    control,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'coAuthors',
  });

  const coAuthorName = watch('coAuthorName');
  const coAuthorEmail = watch('coAuthorEmail');
  const coAuthorAffiliation = watch('coAuthorAffiliation');

  const handleAddCoAuthor = () => {
    if (coAuthorName && coAuthorEmail) {
      append({
        name: coAuthorName,
        email: coAuthorEmail,
        affiliation: coAuthorAffiliation || '',
      });
      setValue('coAuthorName', '');
      setValue('coAuthorEmail', '');
      setValue('coAuthorAffiliation', '');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Paper Information</h3>
        <div className="space-y-4">
          <Field
            as={Input}
            name="title"
            label="Title"
            placeholder="Enter the title of your paper"
          />
          <Field
            as={TextArea}
            name="abstract"
            label="Abstract"
            placeholder="Enter the abstract of your paper (max 2000 characters)"
          />
        </div>
      </div>
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Co-Authors (Optional)</h3>
        <div className="space-y-4">
          {fields.length > 0 && (
            <div className="space-y-2">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-4 py-3"
                >
                  <input type="hidden" {...register(`coAuthors.${index}.name`)} />
                  <input type="hidden" {...register(`coAuthors.${index}.email`)} />
                  <input type="hidden" {...register(`coAuthors.${index}.affiliation`)} />
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200">
                      <User className="h-4 w-4 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{field.name}</p>
                      <p className="text-xs text-gray-500">{field.email}</p>
                      {field.affiliation && (
                        <p className="text-xs text-gray-400">{field.affiliation}</p>
                      )}
                    </div>
                  </div>
                  <Button
                    type="button"
                    onClick={() => remove(index)}
                    className="p-1 text-gray-400 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
          <div className="rounded-lg border border-dashed border-gray-300 p-4">
            <p className="mb-3 text-sm font-medium text-gray-700">Add a co-author</p>
            <div className="grid gap-3 sm:grid-cols-3">
              <input
                {...register('coAuthorName')}
                placeholder="Name"
                className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <input
                {...register('coAuthorEmail')}
                type="email"
                placeholder="Email"
                className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <input
                {...register('coAuthorAffiliation')}
                placeholder="Affiliation (optional)"
                className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <Button
              type="button"
              onClick={handleAddCoAuthor}
              disabled={!coAuthorName || !coAuthorEmail}
              className="mt-3 inline-flex items-center gap-2 rounded-md bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="h-4 w-4" />
              Add Co-Author
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaperMetadata;
