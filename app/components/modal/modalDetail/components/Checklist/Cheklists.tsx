import { RootState } from '@/lib/store/store';

import { useSelector } from 'react-redux';
import Lists from './Lists';
import FormChecklist from './FormChecklist';
import HeaderCheckList from './HeaderCheckList';

const Cheklists = () => {
  const selectedTask = useSelector((state: RootState) => state.tasks.selectedTask);


  return (
    selectedTask?.checkList.map(checklist => (
      <div className="space-y-2" key={checklist.id}>
        <div>
          <HeaderCheckList taskId={selectedTask.id} checkListId={checklist.id} title={checklist.title} item={checklist.item} />
        </div>
        <div className="space-y-2">
          <Lists taskId={selectedTask?.id} id={checklist.id} list={checklist.item} />

          <FormChecklist taskId={selectedTask?.id} checklistId={checklist.id} />

        </div>
      </div>
    ))
  )
}

export default Cheklists