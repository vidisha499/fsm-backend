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

//  @Post('login')
// login(@Body() credentials: { phoneNo: string; password: string }) {
//   // Use 'phoneNo' to match the payload sent from Ionic
//   return this.rangersService.login(credentials.phoneNo, credentials.password);
// }

//   @Get()
//   findAll() {
//     return this.rangersService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.rangersService.findOne(+id);
//   }
// }
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