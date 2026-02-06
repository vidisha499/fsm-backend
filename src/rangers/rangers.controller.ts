// import { Controller, Get, Post, Body, Param ,NotFoundException} from '@nestjs/common';
// import { RangersService } from './rangers.service';
// import { CreateRangerDto } from './dto/create-ranger.dto';

// @Controller('rangers')
// export class RangersController {
//   constructor(private readonly rangersService: RangersService) {}

//   @Post()
//   create(@Body() createRangerDto: CreateRangerDto) {
//     return this.rangersService.create(createRangerDto);
//   }

// //  @Post('login')
// // login(@Body() credentials: { phoneNo: string; password: string }) {
// //   // Use 'phoneNo' to match the payload sent from Ionic
// //   return this.rangersService.login(credentials.phoneNo, credentials.password);
// // }

// //   @Get()
// //   findAll() {
// //     return this.rangersService.findAll();
// //   }

// //   @Get(':id')
// //   findOne(@Param('id') id: string) {
// //     return this.rangersService.findOne(+id);
// //   }
// // }
// @Post('login')
// async login(@Body() credentials: { phoneNo: string; password: string }) {
//   try {
//     const ranger = await this.rangersService.login(
//       credentials.phoneNo,  // matches frontend
//       credentials.password
//     );

//     return { id: ranger.id, username: ranger.username };
//   } catch (err) {
//     throw err;
//   }
// }

// @Post('update')
// async updateRanger(@Body() updateData: any) {
//   console.log('Update received:', updateData);
  
//   // Call the service to perform the database work
//   const updatedRanger = await this.rangersService.update(updateData.id, {
//     name: updateData.name,
//     phoneNo: updateData.phone, // Ensure this matches your DB column name
//     password: updateData.password
//   });

//   return { 
//     success: true, 
//     message: 'Ranger updated successfully',
//     data: updatedRanger 
//   };
// }

// @Post('forgot-password')
// async forgotPassword(@Body() body: { phoneNo: string }) {
//   const ranger = await this.rangersService.findByPhone(body.phoneNo);
  
  
//   if (!ranger) {
//     throw new NotFoundException('No account found with this phone number');
//   }

//   const result = await this.rangersService.sendRecoveryCode(body.phoneNo);
  
//   // ✅ 2. RETURN THE RESULT so the frontend can see the code!
//   return result;
//   // In a real app, you'd send an SMS here or flag the account for admin reset
// //   return { 
// //     success: true, 
// //     message: 'A reset request has been sent. Please contact your supervisor.' 
// //   };
// }
// // rangers.controller.ts

// @Get(':id')
// async findOne(@Param('id') id: string) {
//   const ranger = await this.rangersService.findOne(+id);
  
//   if (!ranger) {
//     throw new NotFoundException(`Ranger with ID ${id} not found`);
//   }

//   // Return the ranger data (Home page needs this)
//   return ranger;
// }
// }

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