import { isEstablished } from ".";
import Entity from "./Entity";
import * as Repository from "./repository";

export async function getCitys() {
    await isEstablished('cloud');
    const citys = await Repository.CitysRepository.find();
    return citys;
}