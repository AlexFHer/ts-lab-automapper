import { Profile } from "./profile";

export class AutoMapper {
    public static map<T extends object, D extends object>(source: T, profile: Profile<T, D>): D {
        const destination: D = profile.getInitialState();

        for (const key in destination) {
            if (destination.hasOwnProperty(key)) {
                const destFn = destination[key];
                if (typeof destFn === "function") {
                    destination[key] = destFn(source);
                } else {
                  // @ts-ignore
                  destination[key] = source[key];
                }
            }
        }

        return destination;
    }

    public static mapArray<T extends object, D extends object>(source: T[], profile: Profile<T, D>): D[] {
        const destination: D[] = [];

        for (const item of source) {
            destination.push(AutoMapper.map(item, profile));
        }

        return destination;
    }
}

