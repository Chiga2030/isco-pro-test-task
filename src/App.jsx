import Table from './components/Table/Table';

import {
  initialLessonsListState as responseLessonsList,
  initialPerformanceState as responsePerformance,
} from './initialState';


const App = () => (
  <div>
    <Table
      lessonsList={ responseLessonsList }
      studentsPerformance={ responsePerformance }
    />
  </div>
);


export default App;
