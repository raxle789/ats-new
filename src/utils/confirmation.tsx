import { ExclamationCircleFilled } from '@ant-design/icons';

const confirmationTemplate = {
  title: 'Confirmation',
  icon: <ExclamationCircleFilled />,
  centered: true,
};

export function editConfirmation(
  handleType: 'jobVacancy' | 'positionLevelRequirement',
) {
  const confirmation = (() => {
    if (handleType === 'jobVacancy') {
      return {
        ...confirmationTemplate,
        content: 'Do you want to edit this job vacancy?',
      };
    } else if (handleType === 'positionLevelRequirement') {
      return {
        ...confirmationTemplate,
        content: "Do you want to set this position level's requirements?",
      };
    }
  })();

  return confirmation;
}

export function deleteConfirmation(handleType: 'jobVacancy') {
  const confirmation = (() => {
    if (handleType === 'jobVacancy') {
      return {
        ...confirmationTemplate,
        content: 'Do you want to delete this job vacancy?',
      };
    }
  })();

  return confirmation;
}

export function duplicateConfirmation(handleType: 'jobVacancy') {
  const confirmation = (() => {
    if (handleType === 'jobVacancy') {
      return {
        ...confirmationTemplate,
        content: 'Do you want to duplicate this job vacancy?',
      };
    }
  })();

  return confirmation;
}

export function submitConfirmation(
  handleType: 'jobVacancy' | 'fpk' | 'positionLevelRequirement' | 'interview',
  mode?: 'create' | 'update',
) {
  const confirmation = (() => {
    if (handleType === 'jobVacancy') {
      if (mode === 'create') {
        return {
          ...confirmationTemplate,
          content: 'Do you want to create this job vacancy?',
        };
      } else if (mode === 'update') {
        return {
          ...confirmationTemplate,
          content: 'Do you want to edit this job vacancy?',
        };
      }
    } else if (handleType === 'fpk') {
      return {
        ...confirmationTemplate,
        content: 'Do you want to assign this TA to this FPK?',
      };
    } else if (handleType === 'positionLevelRequirement') {
      return {
        ...confirmationTemplate,
        content: "Do you want to submit this position level's requirements?",
      };
    } else if (handleType === 'interview') {
      return {
        ...confirmationTemplate,
        content: 'Do you want to create this interview?',
      };
    }
  })();

  return confirmation;
}

export function cancelConfirmation(
  handleType: 'jobVacancy' | 'positionLevelRequirement',
) {
  const confirmation = (() => {
    if (handleType === 'jobVacancy') {
      return {
        ...confirmationTemplate,
        content: 'Do you want to cancel submit this job vacancy?',
      };
    } else if (handleType === 'positionLevelRequirement') {
      return {
        ...confirmationTemplate,
        content:
          "Do you want to cancel set this position level's requirements?",
      };
    }
  })();

  return confirmation;
}

export function viewConfirmation(handleType: 'jobVacancy') {
  const confirmation = (() => {
    if (handleType === 'jobVacancy') {
      return {
        ...confirmationTemplate,
        content: 'Do you want to view this job vacancy?',
      };
    }
  })();

  return confirmation;
}

export function assignConfirmation(handleType: 'assessment' | 'interview') {
  const confirmation = (() => {
    if (handleType === 'assessment') {
      return {
        ...confirmationTemplate,
        content: 'Do you want to assign this candidate to assessment?',
      };
    } else if (handleType === 'interview') {
      return {
        ...confirmationTemplate,
        content: 'Do you want to assign this candidate to interview?',
      };
    }
  })();

  return confirmation;
}

export function resendEmailConfirmation(
  handleType: 'candidate' | 'interviewer',
) {
  const confirmation = (() => {
    if (handleType === 'candidate') {
      return {
        ...confirmationTemplate,
        content:
          'Do you want to resend interview invitation to this candidate?',
      };
    } else if (handleType === 'interviewer') {
      return {
        ...confirmationTemplate,
        content:
          'Do you want to resend interview invitation to this interviewer?',
      };
    }
  })();

  return confirmation;
}

export function resendAssessmentConfirmation() {
  const confirmation = (() => {
    return {
      ...confirmationTemplate,
      content: 'Do you want to resend assessment to this candidate?',
    };
  })();

  return confirmation;
}
