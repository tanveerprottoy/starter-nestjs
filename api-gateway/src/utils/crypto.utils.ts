import * as bcrypt from 'bcrypt';
import { Configs } from "./constants";

export default class CryptoUtils {

    static async generateSalt(rounds: number) {
        return await bcrypt.genSalt(rounds)
    }

    static async hash(data: string): Promise<string> {
        // generate salt to hash password
        const salt = await this.generateSalt(Configs.SALT_ROUNDS)
        return await bcrypt.hash(data, salt)
    }

    static async compare(data: string, dataHash: string) {
        return await bcrypt.compare(data, dataHash);
    }
}