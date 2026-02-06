// import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Ranger } from './entities/ranger.entity';
// import { CreateRangerDto } from './dto/create-ranger.dto';
// import { Twilio } from 'twilio';

// @Injectable()
// export class RangersService {
//   private twilioClient: Twilio;
//   constructor(
//     @InjectRepository(Ranger)
//     private readonly rangerRepository: Repository<Ranger>,
//   ) {
//     this.twilioClient = new Twilio(
//       process.env.TWILIO_ACCOUNT_SID,
//       process.env.TWILIO_AUTH_TOKEN
//     );
//   }

//   // async sendRecoverySMS(phoneNo: string) {
//   //   const ranger = await this.rangerRepository.findOne({ where: { phoneNo } });
//   //   if (!ranger) throw new NotFoundException('Ranger not found');

//   //   // 1. Generate the Recovery Code (like your image)
//   //   const recoveryCode = Math.random().toString(36).substring(2, 10).toUpperCase();

//   //   // 2. Send the REAL SMS
//   //   try {
//   //     await this.twilioClient.messages.create({
//   //       body: `Your Ranger Protocol recovery code is: ${recoveryCode}. Save this code safe.`,
//   //       from: process.env.TWILIO_PHONE_NUMBER,
//   //       to: phoneNo // Ensure phoneNo includes country code (e.g. +91...)
//   //     });

//   //     // 3. Save it as the temporary password or in a recovery column
//   //     ranger.password = recoveryCode; 
//   //     await this.rangerRepository.save(ranger);

//   //     return recoveryCode;
//   //   } catch (error) {
//   //     console.error('Twilio Error:', error);
//   //     throw new Error('Failed to send SMS');
//   //   }
//   // }

//  async sendRecoveryCode(phoneNo: string) {
//   const ranger = await this.rangerRepository.findOne({ where: { phoneNo } });
//   if (!ranger) throw new NotFoundException('Ranger not found');

//   // Generate code like in your image
//   const code = Math.random().toString(36).substring(2, 14).toUpperCase();
//   const fullNumber = phoneNo.startsWith('+') ? phoneNo : `+91${phoneNo}`;

//   // ✅ Fixed the name from 'client' to 'twilioClient'
//   await this.twilioClient.messages.create({
//     body: `Your Ranger failsafe code is: ${code}`,
//     from: process.env.TWILIO_PHONE_NUMBER,
//     to: phoneNo
//   });

//   // Save code to DB as temporary password
//   ranger.password = code;
//   await this.rangerRepository.save(ranger);

//   // Return the code so it can be sent back to the frontend
//   return { recoveryCode: code }; 
// }


//   // This inserts a new row into your 'rangers' table
//   async create(createRangerDto: CreateRangerDto) {
//     const newRanger = this.rangerRepository.create(createRangerDto);
//     return await this.rangerRepository.save(newRanger);
//   }

//   // This runs: SELECT * FROM rangers;
//   async findAll() {
//     return await this.rangerRepository.find();
//   }

//   // FIX: Added to resolve TS2339 error for 'findOne'
//   async findOne(id: number) {
//     const ranger = await this.rangerRepository.findOne({ where: { id } });
//     if (!ranger) {
//       throw new NotFoundException(`Ranger with ID ${id} not found`);
//     }
//     return ranger;
//   }

// async login(phoneNo: string, password: string) {
//   // Use 'phoneNo' to match your PostgreSQL entity exactly
//   const ranger = await this.rangerRepository.findOne({ where: { phoneNo } });

//   if (ranger && ranger.password === password) {
//     return ranger; // This object contains 'id' and 'username'
//   }
  
//   throw new UnauthorizedException('Invalid credentials');
// }

// async update(id: number, data: any) {
//   // 1. Find the ranger
//   const ranger = await this.rangerRepository.findOne({ where: { id } });
//   if (!ranger) throw new NotFoundException('Ranger not found');

//   // 2. Update fields
//   if (data.name) ranger.username = data.name; // match your actual column name
//   if (data.phoneNo) ranger.phoneNo = data.phoneNo;
  
//   // Optional: Hash password if it's being changed
//   if (data.password && data.password !== '********') {
//     ranger.password = data.password; 
//   }

//   // 3. Save and return
//   return this.rangerRepository.save(ranger);
// }

// async findByPhone(phoneNo: string) {
//   // Changed rangersRepository -> rangerRepository
//   return await this.rangerRepository.findOne({ where: { phoneNo } });
// }



// }

import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ranger } from './entities/ranger.entity';
import { CreateRangerDto } from './dto/create-ranger.dto';
import { Twilio } from 'twilio';

@Injectable()
export class RangersService {
  private twilioClient: Twilio;

  constructor(
    @InjectRepository(Ranger)
    private readonly rangerRepository: Repository<Ranger>,
  ) {
    this.twilioClient = new Twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );
  }

  /**
   * ✅ HELPER: Normalizes any phone input to +91XXXXXXXXXX
   * This ensures consistency in the database and Twilio compatibility.
   */
  private formatPhone(phone: string): string {
    if (!phone) return '';
    
    // Remove all non-numeric characters
    let cleaned = phone.replace(/\D/g, '');

    // Case 1: 10 digits (e.g., 9876543210) -> Add +91
    if (cleaned.length === 10) {
      return `+91${cleaned}`;
    }
    
    // Case 2: 12 digits starting with 91 (e.g., 919876543210) -> Add +
    if (cleaned.length === 12 && cleaned.startsWith('91')) {
      return `+${cleaned}`;
    }
    
    // Case 3: Already has the + prefix -> Return as is
    if (phone.startsWith('+')) {
      return phone;
    }

    // Default: return the cleaned number (or handle as error)
    return phone;
  }

  async sendRecoveryCode(phoneNo: string) {
    // Format number to ensure we find the record in the DB
    const formattedPhone = this.formatPhone(phoneNo);
    
    const ranger = await this.rangerRepository.findOne({ where: { phoneNo: formattedPhone } });
    if (!ranger) throw new NotFoundException('Ranger not found with this phone number');

    // Generate a secure uppercase recovery code
    const code = Math.random().toString(36).substring(2, 14).toUpperCase();

    try {
      // Send the SMS via Twilio using the formatted +91 number
      await this.twilioClient.messages.create({
        body: `Your Ranger failsafe code is: ${code}`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: formattedPhone
      });

      // Save the code as the temporary password
      ranger.password = code;
      await this.rangerRepository.save(ranger);

      // Return the code to the controller/frontend
      return { recoveryCode: code };
    } catch (error) {
      console.error('Twilio SMS Error:', error);
      throw new Error('Failed to send recovery SMS. Please check the phone number.');
    }
  }

  async create(createRangerDto: CreateRangerDto) {
    // ✅ Always format to +91 before saving a new Ranger
    createRangerDto.phoneNo = this.formatPhone(createRangerDto.phoneNo);
    const newRanger = this.rangerRepository.create(createRangerDto);
    return await this.rangerRepository.save(newRanger);
  }

  async findAll() {
    return await this.rangerRepository.find();
  }

  async findOne(id: number) {
    const ranger = await this.rangerRepository.findOne({ where: { id } });
    if (!ranger) {
      throw new NotFoundException(`Ranger with ID ${id} not found`);
    }
    return ranger;
  }

  async login(phoneNo: string, password: string) {
    // ✅ Normalize input to match database format
    const formattedPhone = this.formatPhone(phoneNo);
    const ranger = await this.rangerRepository.findOne({ where: { phoneNo: formattedPhone } });

    if (ranger && ranger.password === password) {
      return ranger; // Contains id and username
    }
    
    throw new UnauthorizedException('Invalid credentials. Check your phone number or password.');
  }

  async update(id: number, data: any) {
    const ranger = await this.rangerRepository.findOne({ where: { id } });
    if (!ranger) throw new NotFoundException('Ranger not found');

    // Update username if provided
    if (data.name) ranger.username = data.name; 
    
    // ✅ Format phoneNo if it is being updated
    if (data.phoneNo) {
      ranger.phoneNo = this.formatPhone(data.phoneNo);
    }
    
    // Update password (ignore if it's the masked UI placeholder)
    if (data.password && data.password !== '********') {
      ranger.password = data.password; 
    }

    return await this.rangerRepository.save(ranger);
  }

  async findByPhone(phoneNo: string) {
    // ✅ Normalize before searching
    const formattedPhone = this.formatPhone(phoneNo);
    return await this.rangerRepository.findOne({ where: { phoneNo: formattedPhone } });
  }
}