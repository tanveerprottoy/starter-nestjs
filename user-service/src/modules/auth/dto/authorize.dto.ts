import { IsNotEmpty } from 'class-validator';

export class AuthorizeDto {
    @IsNotEmpty()
    readonly bearerToken: string;
}
