import { Form, Formik } from "formik";
import React, { FC } from "react"
import { TaskEditValidationSchema } from "./task-edit-validation";
import InputGroup from "../input-group/input-group";
import { useProjectStore } from "@/store/project-store";
import { Flex } from "@radix-ui/themes";
import AppButton from "../app-button/app-button";
import { EditTask } from "@/shared/types/edit-task";

interface TaskModalEditProps {
  setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  name: string;
  description: string;
  blockedBy?: number,
  taskId: number
}

const TaskModalEdit: FC<TaskModalEditProps> = ({
  setIsEditMode,
  name,
  description,
  blockedBy,
  taskId
}) => {
  const initialValues = {
    name: name,
    description: description,
    blockerId: -1,
  }
  const projectStore = useProjectStore()
  const projectTasks = projectStore.getTasks;

  const handleSubmit = async (values: typeof initialValues) => {
    const newTaskData: EditTask = {
      name: values.name,
      description: values.description,
    };

    if (values.blockerId > -1) {
      newTaskData.task = {
        id: Number(values.blockerId),
      };
    };

    projectStore.editTask(taskId, newTaskData)
    setIsEditMode(false);
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={TaskEditValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ touched, errors }) => (
        <Form style={{ width: "100%" }}>
          <Flex justify="between" width="100%">
            <Flex direction="column">
              <InputGroup
                id="name"
                type="text"
                touched={touched.name}
                errors={errors.name}
                label="Task Name"
              />

              <InputGroup
                id="description"
                type="text"
                touched={touched.description}
                errors={errors.description}
                label="Description"
                as="textarea"
                rows={2}
              />

              {
                blockedBy
                  ? null
                  :
                  <InputGroup
                    id="blockerId"
                    type="text"
                    touched={touched.blockerId}
                    errors={errors.blockerId}
                    label="Block with task"
                    as="select"
                    placeholder="Leave empty"
                  >
                    <option key={-1} value={-1}>
                      None
                    </option>
                    {projectTasks
                      .filter(task => task.id !== taskId)
                      .map(task => (
                        <option key={task.id} value={task.id}>
                          {task.name}
                        </option>
                      ))}
                  </InputGroup>
              }
            </Flex>

            <Flex direction="column" gap="5px">
              <AppButton
                color="red"
                type="button"
                variant="soft"
                onClick={() => setIsEditMode(false)}
              >
                Cancel
              </AppButton>
              <AppButton type="submit" variant="solid">Save</AppButton>
            </Flex>
          </Flex>
        </Form>
      )}
    </Formik>

  )
};

export default TaskModalEdit;
