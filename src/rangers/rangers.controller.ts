import { Controller, Get, Post, Body, Param, NotFoundException } from '@nestjs/common';
import { RangersService } from './rangers.service';
import { CreateRangerDto } from './dto/create-ranger.dto';

@Controller('rangers')
export class RangersController {
  constructor(private readonly rangersService: RangersService) {}

  // 1. Register a new Ranger
  @Post()
  create(@Body() createRangerDto: CreateRangerDto) {
    return this.rangersService.create(createRangerDto);
  }

  // 2. Login
  @Post('login')
  async login(@Body() credentials: { phoneNo: string; password: string }) {
    try {
      const ranger = await this.rangersService.login(
        credentials.phoneNo,
        credentials.password
      );
      return { id: ranger.id, username: ranger.username };
    } catch (err) {
      throw err;
    }
  }

  // 3. Step 1: Forgot Password - Sends OTP to Email
  @Post('forgot-password')
  async forgotPassword(@Body() body: { phoneNo: string }) {
    const ranger = await this.rangersService.findByPhone(body.phoneNo);
    
    if (!ranger) {
      throw new NotFoundException('No account found with this phone number');
    }

    // This calls the service that uses Nodemailer to send OTP to ranger.emailId
    return await this.rangersService.sendOtpEmail(body.phoneNo);
  }

  // 4. Step 2: Reset Password - Verifies OTP and updates Password
  @Post('reset-password')
  async resetPassword(@Body() body: { phoneNo: string; otp: string; newPass: string }) {
    return await this.rangersService.resetPassword(body.phoneNo, body.otp, body.newPass);
  }

  // 5. Update Profile
  @Post('update')
  async updateRanger(@Body() updateData: any) {
    const updatedRanger = await this.rangersService.update(updateData.id, {
      name: updateData.name,
      phoneNo: updateData.phone,
      password: updateData.password
    });

    return { 
      success: true, 
      message: 'Ranger updated successfully',
      data: updatedRanger 
    };
  }

  // 6. Get Ranger by ID (For Home/Profile Page)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const ranger = await this.rangersService.findOne(+id);
    if (!ranger) {
      throw new NotFoundException(`Ranger with ID ${id} not found`);
    }
    return ranger;
  }


// src/rangers/rangers.controller.ts

@Post('verify-otp')
async verifyOtp(@Body() body: { phoneNo: string; otp: string }) {
  // This calls the service method you just fixed!
  return this.rangersService.verifyOtp(body.phoneNo, body.otp);
}

  
}