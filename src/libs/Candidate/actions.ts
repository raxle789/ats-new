'use server';

import prisma from "@/root/prisma";
import { getUserSession } from "../Sessions";

export async function updateCandidateProfile(submittedValue: any) {
  const regSession = await getUserSession('auth');
  console.info('reg-session-data', regSession);
  try {
    const updateProfile = await prisma.$transaction(async (tx) => {
      await tx.$queryRaw`
        UPDATE dbo.documents
        SET original_name = ${submittedValue.profile.uploadPhoto.original_name},
            byte_size = ${submittedValue.profile.uploadPhoto.byte_size},
            file_base = ${Buffer.from(submittedValue.profile.uploadPhoto.file_base)}
        WHERE candidate_id = ${regSession.candidate.id}`;
      await tx.users.update({
        where: {
          id: regSession.user.id
        },
        data: {
          email: submittedValue.profile.email,
          name: submittedValue.profile.fullname
        }
      });
      await tx.candidates.update({
        where: {
          id: regSession.candidate.id,
        },
        data: {
          blood_type: submittedValue.profile.bloodType,
          date_of_birth: submittedValue.profile.dateOfBirth,
          ethnicity: submittedValue.profile.ethnicity,
          gender: submittedValue.profile.gender,
          maritalStatus: submittedValue.profile.maritalStatus,
          phone_number: submittedValue.profile.phoneNumber,
          birthCity: submittedValue.profile.placeOfBirth,
          religion: submittedValue.profile.religion,
        }
      });
      await tx.addresses.updateMany({
        where: {
          candidateId: regSession.candidate.id
        },
        data: {
          city: submittedValue.address.city,
          country: submittedValue.address.country,
          currentAddress: submittedValue.address.currentAddress ?? null,
          street: submittedValue.address.permanentAddress,
          rt: submittedValue.address.rt,
          rw: submittedValue.address.rw,
          subdistrict: submittedValue.address.subdistrict,
          village: submittedValue.address.village,
          zipCode: submittedValue.address.zipCode
        }
      });
      return {
        success: true,
        message: 'Updated successfully'
      };
    });
    return updateProfile;
  } catch (error) {
    console.info('error updating: ', error);
    return {
      success: false,
      message: 'Error updating profile'
    };
  }
};