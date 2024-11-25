import { Button } from '@/components/ui/button';

import { RootState } from '@/lib/store/store';

import { useDispatch, useSelector } from 'react-redux';
import Lists from './Lists';
import { removeCheckList } from '@/lib/store/tasksSlice';
import FormChecklist from './FormChecklist';
import ListNumber from './ListNumber';

const Cheklists = () => {
  const selectedTask = useSelector((state: RootState) => state.tasks.selectedTask);

  const dispatch = useDispatch();

  const removeCheckListHandler = (checklistId: string) => {
    if (!selectedTask?.id) {
      return;
    }
    dispatch(removeCheckList({ taskId: selectedTask?.id, checklistId }));
  }


  return (
    selectedTask?.checkList.map(checklist => (
      <div className="space-y-2" key={checklist.id}>
        <div>
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">{checklist.title}</h3>
            <Button variant="outline" size="sm" onClick={() => removeCheckListHandler(checklist.id)}>Delete</Button>
          </div>
          <div className='text-xs'>
            <ListNumber checkList={checklist.item} />
          </div>
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