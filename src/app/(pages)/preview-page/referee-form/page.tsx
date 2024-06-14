'use client';
import RefereeForm from '@/app/components/dashboard/employ/referee-form';

const RefereeFormPage = () => {
  return (
    <section className="registration-section position-relative pt-50 lg-pt-80 pb-50 lg-pb-80">
      <div className="container">
        <div className="user-data-form user-register-form">
          <div>
            <h2 className="text-center login-title">Referee Form</h2>
          </div>
          <div className="form-wrapper m-auto register-wrapper">
            <div className="tab-content mt-40">
              <RefereeForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RefereeFormPage;
