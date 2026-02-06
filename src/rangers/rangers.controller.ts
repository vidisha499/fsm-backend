import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { RangersService } from './rangers.service';
import { CreateRangerDto } from './dto/create-ranger.dto';

@Controller('rangers')
export class RangersController {
  constructor(private readonly rangersService: RangersService) {}

  @Post()
  create(@Body() createRangerDto: CreateRangerDto) {
    return this.rangersService.create(createRangerDto);
  }


@Post('login')
async login(@Body() credentials: { phoneNo: string; password: string }) {
  try {
    const ranger = await this.rangersService.login(
      credentials.phoneNo,  // matches frontend
      credentials.password
    );

    return { id: ranger.id, username: ranger.username };
  } catch (err) {
    throw err;
  }
}

}