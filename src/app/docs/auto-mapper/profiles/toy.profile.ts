import { Profile } from "../../../../../projects/auto-mapper/src/lib/classes/profile";
import { ToyClass } from "../classes/toy";
import { ToyDto } from "../interfaces/toyDto";

const toyInitialState: ToyClass = new ToyClass('', 0, 0, false);

export const dtoToyToToyProfile = new Profile<ToyDto, ToyClass>(toyInitialState)
.forMember('VPOPrice', (source) => source.price * 1.2)
.forMember('isAvailable', (source) => source.available);
