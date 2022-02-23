export function valueOrDefault<T>(value: any, defaultValue: T): T {
  return value === undefined || value === null ? defaultValue : value;
}

export function classNameOf<T extends Function>(constructor: T): string {
  return constructor.toString().match(/\w+/g)![1];
}

export function extendMap(target: Map<any, any>, source: Map<any, any>) {
  source.forEach((value, key) => {
    target.set(key, value);
  });
}

export type NullableOrUndef<T> = T | null | undefined;

export function replacer(key: string, value: any) {
  if (value instanceof Map) {
    return {
      __dataType: "Map",
      __value: Array.from(value.entries()), // or with spread: value: [...value]
    };
  } else {
    return value;
  }
}

export function reviver(key: string, value: any) {
  if (typeof value === "object" && value !== null) {
    if (value.__dataType === "Map") {
      return new Map(value.__value);
    }
  }
  return value;
}
