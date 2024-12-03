import React from 'react';
import { Droppable, DroppableProps } from 'react-beautiful-dnd';

type DroppableWrapperProps = Omit<DroppableProps, 'children'> & {
  children: ((provided: any, snapshot: any) => React.ReactNode) | React.ReactNode;
};

export const DroppableWrapper: React.FC<DroppableWrapperProps> = ({
  children,
  ...props
}) => {
  return (
    <Droppable {...props}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {typeof children === 'function' ? children(provided, snapshot) : children}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};