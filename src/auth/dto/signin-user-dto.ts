import { IsNotEmpty, IsString, Length } from 'class-validator';
export class SigninUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(6, 20, {
    // $value当前用户传入的值，
    // $property 当前属性名
    // $target 当前类
    // $constraint1 最小长度
    // $constraint1 最大长度
    message: `$property长度必须在$constraint1到$constraint2之间，当前值是$value`,
  })
  username: string;
  @IsString()
  @IsNotEmpty()
  @Length(6, 32, {
    message: `$property长度必须在$constraint1到$constraint2之间，当前值是$value`,
  })
  password: string;
}
