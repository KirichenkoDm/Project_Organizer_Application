"use client";

import { Flex, Heading, IconButton, Text } from "@radix-ui/themes";
import React, { FC, forwardRef } from "react";
import styles from "./board-column-task-card.module.css"
import { useProjectStore } from "@/store/project-store";

const left = <svg color="black" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.84182 3.13514C9.04327 3.32401 9.05348 3.64042 8.86462 3.84188L5.43521 7.49991L8.86462 11.1579C9.05348 11.3594 9.04327 11.6758 8.84182 11.8647C8.64036 12.0535 8.32394 12.0433 8.13508 11.8419L4.38508 7.84188C4.20477 7.64955 4.20477 7.35027 4.38508 7.15794L8.13508 3.15794C8.32394 2.95648 8.64036 2.94628 8.84182 3.13514Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
</svg>
const right = <svg color="black" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
</svg>

interface ColumnReorderControlsProps {
  id: number
}

const ColumnReorderControls: FC<ColumnReorderControlsProps> = ({ id }) => {
  const projectStore = useProjectStore()
  const handleDecrementOrder = (e: React.MouseEvent) => {
    e.stopPropagation();
    projectStore.reorderColumn(id, "decrement");
  }

  const handleIncrementOrder = (e: React.MouseEvent) => {
    e.stopPropagation();
    projectStore.reorderColumn(id, "increment");
  }

  return (
    <Flex direction="row" gap="15px" align="center" justify="between">
      <IconButton 
        color="gray" 
        variant="ghost"
        onClick={handleDecrementOrder}
      >
        {left}
      </IconButton>
      <IconButton 
        color="gray" 
        variant="ghost"
        onClick={handleIncrementOrder}
      >
        {right}
      </IconButton>
    </Flex>
  )
}

export default ColumnReorderControls;