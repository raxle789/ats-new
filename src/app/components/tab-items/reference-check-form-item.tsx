import { Tabs } from 'antd';
import RefereeFormItem from './referee-form-item';
import ReferenceCheckResultFormItem from './reference-check-result-form-item';

const { TabPane } = Tabs;

const ReferenceCheckFormItem = ({ index }) => {
  return (
    <Tabs defaultActiveKey={`referee#${index}`}>
      <TabPane tab="Referee" key={`referee${index}`} forceRender>
        <RefereeFormItem />
      </TabPane>
      <TabPane tab="Result" key={`result#${index}`} forceRender>
        <ReferenceCheckResultFormItem />
      </TabPane>
    </Tabs>
  );
};

export default ReferenceCheckFormItem;
