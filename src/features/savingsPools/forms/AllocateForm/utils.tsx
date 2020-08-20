// https://github.com/final-form/react-final-form/blob/master/docs/faq.md#why-cant-i-have-numeric-keys-in-an-object
export const stringifyName = (value: string) => `key${value}`;
export const destringifyName = (value: string) => value.substring(3);
