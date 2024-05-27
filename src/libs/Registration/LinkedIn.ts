'use server';

import prisma from "@/root/prisma";
import bcrypt from 'bcrypt';
import { REGISTER } from "../validations/Register";
import { TypeSubmittedValues1, TypeReturnedServerAction } from ".";
import { deleteSession, setUserSession } from "../Sessions";

export async function RegisterWithLinkedIn(submittedValues1: TypeSubmittedValues1): Promise<TypeReturnedServerAction> {
  const validateInput = REGISTER.safeParse(submittedValues1);
  console.info('validating input...');
  if(!validateInput.success) {
    const zodErrors = validateInput.error.flatten().fieldErrors;
    return {
      success: false,
      data: null,
      errors: zodErrors,
      message: 'Field validation failed'
    };
  };
  console.info('begin transaction register phase 1...');
  console.info('hashing password...');
  try {
    const doRegisterPhase1 = await prisma.$transaction(async (tx) => {
      console.info('storing user...');
      const hashedPassword = await bcrypt.hash(submittedValues1.password, 10);
      const storeUser = await tx.users.create({
        data: {
          name: submittedValues1.fullname,
          email: submittedValues1.email,
          is_email_verified: true,
          password: hashedPassword
        }
      });
      console.info('storing candidate...');
      const storeCandidate = await tx.candidates.create({
        data: {
          userId: storeUser.id,
          phone_number: validateInput.data.phoneNumber,
          date_of_birth: validateInput.data.dateOfBirth
        }
      });
      /* Storing documents or not, profile returned by linkedin */
      console.info('set register session...');
      await setUserSession('reg',
        {
          user: {
            id: storeUser.id,
            name: storeUser.name,
            email: storeUser.email,
          },
          candidate: {
            id: storeCandidate.id,
            phone_number: storeCandidate.phone_number,
            date_of_birth: storeCandidate.date_of_birth,
            is_email_verified: true
          },
        },
        undefined,
      );
      /* delete linkedin-session */
      await deleteSession('linkedin');
  
      /* Return transaction */
      return {
        success: true,
        data: {
          user: storeUser.id,
          candidate: storeCandidate.id
        },
        errors: null,
        message: 'Register with LinkedIn successfully'
      };
    });
    
    return doRegisterPhase1;
  } catch (error) {
    /**
     * Error handling here
     */
    return {
      success: false,
      data: null,
      errors: null,
      message: 'There was an error with our database operation or connection. Please try again'
    };
  };

  return {
    success: false,
    data: null,
    errors: null,
    message: 'Unknown error, hufft...'
  };
};