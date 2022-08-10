export type RolesAuthReturnType = <TFunction extends () => unknown, Y>(
  target: Record<string, unknown> | TFunction,
  propertyKey?: string | symbol,
  descriptor?: TypedPropertyDescriptor<Y>,
) => void;
