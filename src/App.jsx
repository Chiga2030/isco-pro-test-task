import Table from './components/Table/Table';

import {
  initialClassesListState as responseClassesList,
  initialPerformanceState as responsePerformance,
} from './initialState';


const App = () => (
  <div>
    <Table
      classesList={ responseClassesList }
      studentsPerformance={ responsePerformance }
    />
  </div>
);


export default App;
