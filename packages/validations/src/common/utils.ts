import { ObjectSchema } from 'yup';

export function merge(...schemas: ObjectSchema<Record<string, any>>[]) {
  const [first, ...rest] = schemas;

  const merged = rest.reduce((mergedSchemas, schema) => mergedSchemas.concat(schema), first);

  return merged;
}
