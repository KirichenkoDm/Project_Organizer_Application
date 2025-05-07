import { Flex } from "@radix-ui/themes";
import React, { FC } from "react"
import BoardColumn from "../board-column/board-column";
import styles from "./board-main.module.css"
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useProjectStore } from "@/store/project-store";
import { observer } from "mobx-react-lite";
import { SortableContext } from "@dnd-kit/sortable";

const BoardMain: FC = observer(() => {
  const projectStore = useProjectStore()
  const columns = projectStore.getColumns();

  // const handleDragEnd = (event: DragEndEvent) => {
  //   console.log("end")
  //   const { active, over} = event;
    
  //   // if (over && active.id !== over.id) {
  //   //   projectStore.reorderColumns(Number(active.id), Number(over.id))
  //   // }
  // };


  return (
    <Flex
      justify="between"
      className={styles.boardMain}
    >
      <DndContext id="columns"
        // onDragEnd={handleDragEnd}
      >
        <SortableContext items={columns}>
        <BoardColumn name="qwerty" order={0} isCustom={false} key={0} id={0}/>
        <BoardColumn name="qwerty" order={1} isCustom={false} key={1} id={1}/>
        <BoardColumn name="qwerty" order={2} isCustom={false} key={2} id={2}/>
        <BoardColumn name="qwerty" order={3} isCustom={false} key={3} id={3}/>
        <BoardColumn name="qwerty" order={4} isCustom={false} key={4} id={4}/>
          {/* {columns.map((column) =>
            {
              console.log(column.order);
              return <BoardColumn {...column} key={column.id} id={column.order}/>
            }
            
          )} */}
          <BoardColumn name="qwerty" order={5} isCustom={false} key={5} id={5}/>
        </SortableContext>
      </DndContext>
    </Flex>
  );
})
export default BoardMain;