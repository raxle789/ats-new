// import React from "react";
// import ActionDropdown from "../candidate/action-dropdown";
// import { Table, Button, Form, Select, notification, Modal } from 'antd';

// const FPKItem = ({
//   data,
//   index,
//   fpkNo,
//   jobTitle,
//   jobLevel,
//   companyCode,
//   fpkUser,
//   location,
//   statusMpp,
//   createFpk,
//   fpkFullyApproved,
//   fpkStatus,
//   jobPosting,
//   picTa,
//   // title,
//   // info,
//   // date,
//   // application,
//   // status,
// }: {
//   // title: string;
//   // info: string;
//   // date: string;
//   // application: string;
//   // status: string;
//   data: {},
//   index: number,
//   fpkNo: string,
//   jobTitle: string,
//   jobLevel: string,
//   companyCode: string,
//   fpkUser: number,
//   location: string,
//   statusMpp: string,
//   createFpk: string,
//   fpkFullyApproved: string,
//   fpkStatus: string,
//   jobPosting: string,
//   picTa: number,
// }) => {
//   return (
//     <tr key={fpkNo}>
//       <th scope="row">{index + 1 + offset}</th>
//       <td>{`${jobTitle}\n${fpkNo}`}</td>
//       <td>{`${jobLevel}`}</td>
//       <td>{`${companyCode}`}</td>
//       <td>{`${userData.filter((user) => user.userId === fpkUser)[0]?.userName}\n${userData.filter((user) => user.userId === data.fpkUser)[0]?.userEmail}`}</td>
//       <td>{`${location}`}</td>
//       <td>{`${statusMpp}`}</td>
//       <td>{`${createFpk}`}</td>
//       <td>{`${fpkFullyApproved}`}</td>
//       <td>{`${fpkStatus}`}</td>
//       <td>{`${jobPosting}`}</td>
//       <td>
//         <Form
//           name={`assignTaForm${fpkNo}`}
//           layout="vertical"
//           variant="filled"
//           initialValues={{
//             [`picTa${fpkNo}`]:
//               picTa === -1 ? null : picTa,
//           }}
//           onFinish={handleAssignTa}
//         >
//           <Form.Item name={`picTa${fpkNo}`}>
//             <Select
//               className="select"
//               showSearch
//               allowClear
//               placeholder="Select TA"
//               optionFilterProp="children"
//               filterOption={(input, option) =>
//                 (option?.label ?? '').includes(input)
//               }
//               filterSort={(optionA, optionB) =>
//                 (optionA?.label ?? '')
//                   .toLowerCase()
//                   .localeCompare(
//                     (optionB?.label ?? '').toLowerCase(),
//                   )
//               }
//               options={taData.map((ta) => {
//                 return {
//                   label: ta.taName,
//                   value: ta.taId,
//                 };
//               })}
//             />
//           </Form.Item>
//           <Form.Item>
//             <Button htmlType="submit">Assign</Button>
//           </Form.Item>
//         </Form>
//       </td>
//     </tr>
//     // <tr className={status}>
//     //   <td>
//     //     <div className="job-name fw-500">{title}</div>
//     //     <div className="info1">{info}</div>
//     //   </td>
//     //   <td>{date}</td>
//     //   <td>{application} Applications</td>
//     //   <td>
//     //     <div className="job-status text-capitalize">{status}</div>
//     //   </td>
//     //   <td>
//     //     <div className="action-dots float-end">
//     //       <button
//     //         className="action-btn dropdown-toggle"
//     //         type="button"
//     //         data-bs-toggle="dropdown"
//     //         aria-expanded="false"
//     //       >
//     //         <span></span>
//     //       </button>
//     //       {/* action dropdown start */}
//     //       <ActionDropdown />
//     //       {/* action dropdown end */}
//     //     </div>
//     //   </td>
//     // </tr>
//   );
// };

// export default FPKItem;
