import { ApiProperty } from '@nestjs/swagger';

// in the future, this is also used to represent your database table
export class User {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}
