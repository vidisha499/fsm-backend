import { Controller, Get, Post, Body, Param ,NotFoundException} from '@nestjs/common';
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

@Post('update')
async updateRanger(@Body() updateData: any) {
  console.log('Update received:', updateData);
  
  // Call the service to perform the database work
  const updatedRanger = await this.rangersService.update(updateData.id, {
    name: updateData.name,
    phoneNo: updateData.phone, // Ensure this matches your DB column name
    password: updateData.password
  });

  return { 
    success: true, 
    message: 'Ranger updated successfully',
    data: updatedRanger 
  };
}

@Post('forgot-password')
async forgotPassword(@Body() body: { phoneNo: string }) {
  const ranger = await this.rangersService.findByPhone(body.phoneNo);
  
  
  if (!ranger) {
    throw new NotFoundException('No account found with this phone number');
  }

  const result = await this.rangersService.sendRecoveryCode(body.phoneNo);
  
  // ✅ 2. RETURN THE RESULT so the frontend can see the code!
  return result;
  // In a real app, you'd send an SMS here or flag the account for admin reset
//   return { 
//     success: true, 
//     message: 'A reset request has been sent. Please contact your supervisor.' 
//   };
}
// rangers.controller.ts

@Get(':id')
async findOne(@Param('id') id: string) {
  const ranger = await this.rangersService.findOne(+id);
  
  if (!ranger) {
    throw new NotFoundException(`Ranger with ID ${id} not found`);
  }

  // Return the ranger data (Home page needs this)
  return ranger;
}


}