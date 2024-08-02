import { ApiProperty } from '@nestjs/swagger';

export class HealthDto {
  @ApiProperty({ example: 'ok', description: 'The health status of the application.' })
  status: string;
}
