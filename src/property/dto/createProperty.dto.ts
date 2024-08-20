import { IsInt, IsPositive, IsString, Length } from 'class-validator';

export class CreatePropertyDto {
  // always untuk semua group
  @IsString({ always: true })
  @Length(2, 10, { always: true, message: 'error on length' })
  name: string;

  @IsString()
  @Length(2, 10, { groups: ['create'] })
  @Length(1, 15, { groups: ['update'] })
  description: string;

  @IsInt({ always: true })
  @IsPositive({ always: true })
  area: number;
}
