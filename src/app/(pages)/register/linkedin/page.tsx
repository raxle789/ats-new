import Image from 'next/image';
import Link from 'next/link';
import { fetchLinkedInProfile, insertUserStaticData } from '@/lib/Authentication';
import { Button } from 'antd';

export default async function LinkedInProfile() {
    const linkedinData = await fetchLinkedInProfile();
    console.log(linkedinData);
    return (
        <>
        <div className="container">
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="d-flex flex-column align-items-center">
                    <h4 className='mb-4'>Is your LinkedIn Account?</h4>
                    <Image
                        className='rounded-circle mb-4'
                        /* image source */
                        src={linkedinData.picture}
                        alt="User Profile"
                        width={150}
                        height={150}
                        />
                        <div className="">
                            {/* user name */}
                            {linkedinData.name}
                        </div>
                        <div className="mb-3">
                            {/* user country */}
                            {linkedinData.locale.country}
                        </div>
                    <span className="text-primary">{linkedinData.email}</span>
                    {/* <form
                        className=""
                        action={insertUserStaticData}>
                        <input type="hidden" name='name' value={linkedinData.name} />
                        <input type="hidden" name='email' value={linkedinData.email} />
                        <div className="mb-3">
                            <label htmlFor="password" className='form-label'>Password</label>
                            <input type="password" className='form-control' name='password' id='password' />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="confirm_password" className='form-label'>Password Confirmation</label>
                            <input type="password" name='password_confirmation' className='form-control' id='confirm_password' />
                        </div>
                        <div className="btn-container mt-5">
                            <Link
                                className='btn btn-sm border me-3 ps-4 pe-4'
                                href="href">
                                    No
                            </Link>
                            <button type='submit' className='btn btn-sm btn-primary ms-3 ps-4 pe-4'>
                                Continue Register
                            </button>
                        </div>
                    </form> */}
                    <div className="mt-3">
                        <Link
                            className='btn btn-sm border me-3 ps-4 pe-4'
                            href="/register">
                            No
                        </Link>
                        <Link
                            className='btn btn-sm btn-primary border me-3 ps-4 pe-4'
                            href='/'>
                                Yes
                        </Link>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}