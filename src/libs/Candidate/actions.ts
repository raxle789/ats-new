'use server';

import prisma from "@/root/prisma";
import { getUserSession } from "../Sessions";
import { TypeReturnedServerAction } from "../Registration";

export async function updateCandidateProfile(submittedValue: any): Promise<TypeReturnedServerAction> {
  console.info('Submitted Value Data \t:', submittedValue);
  const authSession = await getUserSession('auth');
  console.info('reg-session-data', authSession);
  try {
    const updateProfile = await prisma.$transaction(async (tx) => {
      console.info("is user update profile photo?...")
      if(submittedValue.profilePicture) {
        console.info("updating profile picture...");
        await tx.documents.updateMany({
          where: {
            candidate_id: authSession.candidate.id,
            documentTypeId: 1 // specify document type
          },
          data: {
            original_name: submittedValue.profilePicture.original_name,
            byte_size: submittedValue.profilePicture.byte_size,
            file_base: Buffer.from(submittedValue.profilePicture.file_base),
            updated_at: new Date(Date.now()),
          }
        });
      };
      console.info('updating user data...');
      await tx.users.update({
        where: {
          id: authSession.user.id
        },
        data: {
          name: submittedValue.profile.fullname,
          email: submittedValue.profile.email,
          updated_at: new Date(Date.now()),
        }
      });
      console.info('updating candidate data...');
      await tx.candidates.update({
        where: {
          id: authSession.candidate.id
        },
        data: {
          blood_type: submittedValue.profile.bloodType,
          date_of_birth: new Date(`${submittedValue.profile.dateOfBirth}`),
          ethnicity: submittedValue.profile.ethnicity,
          gender: submittedValue.profile.gender,
          maritalStatus: submittedValue.profile.maritalStatus,
          phone_number: submittedValue.profile.phoneNumber,
          birthCity: submittedValue.profile.placeOfBirth,
          religion: submittedValue.profile.religion
        }
      });
      console.info('updating address data...');
      await tx.addresses.updateMany({
        where: {
          id_of_candidate: authSession.candidate.id
        },
        data: {
          city: submittedValue.address.city,
          country: submittedValue.address.country,
          currentAddress: submittedValue.address.currentAddress ?? '',
          street: submittedValue.address.permanentAddress,
          rt: submittedValue.address.rt,
          rw: submittedValue.address.rw,
          subdistrict: submittedValue.address.subdistrict,
          village: submittedValue.address.village,
          zipCode: submittedValue.address.zipCode
        }
      });
      console.info('finish:')
      return {
        success: true,
        data: null,
        errors: null,
        message: "Data updated successfully:"
      };
    });
    return updateProfile;
  } catch (error) {
    console.info('error updating: ', error);
    return {
      success: false,
      data: null,
      errors: error,
      message: 'Error updating profile'
    };
  }
};