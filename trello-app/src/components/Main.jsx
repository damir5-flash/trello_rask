import React, { useContext, useState } from 'react';
import { MoreHorizontal, UserPlus, Edit2 , Check } from 'react-feather';
import CardAdd from './CardAdd';
import { BoardContext } from '../context/BoardContext';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import AddList from './AddList';
import Utils from '../utils/Utils';

const Main = () => {
  const { allboard, setAllBoard } = useContext(BoardContext);
  const bdata = allboard.boards[allboard.active];

  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  const handleSaveEdit = (listIndex, itemIndex) => {
    const newList = [...bdata.list];
    newList[listIndex].items[itemIndex].title = editText;

    const board_ = { ...allboard };
    board_.boards[board_.active].list = newList;
    setAllBoard(board_);
    setEditingId(null);
  };

  function onDragEnd(res) {
    if (!res.destination) return;

    const newList = [...bdata.list];
    const s_id = parseInt(res.source.droppableId);
    const d_id = parseInt(res.destination.droppableId);
    const [removed] = newList[s_id - 1].items.splice(res.source.index, 1);
    newList[d_id - 1].items.splice(res.destination.index, 0, removed);

    let board_ = { ...allboard };
    board_.boards[board_.active].list = newList;
    setAllBoard(board_);
  }

  const cardData = (e, ind) => {
    let newList = [...bdata.list];
    newList[ind].items.push({ id: Utils.makeid(5), title: e });

    let board_ = { ...allboard };
    board_.boards[board_.active].list = newList;
    setAllBoard(board_);
  };

  const listData = (e) => {
    let newList = [...bdata.list];
    newList.push({ id: newList.length + 1 + '', title: e, items: [] });

    let board_ = { ...allboard };
    board_.boards[board_.active].list = newList;
    setAllBoard(board_);
  };

  return (
    <div className='text-white flex flex-col w-full h-screen' style={{ backgroundColor: bdata.bgcolor }}>
      {/* Header */}
      <div className='p-3 bg-black flex justify-between w-full bg-opacity-50'>
        <h2 className='text-lg'>{bdata.name}</h2>
        <div className='flex items-center justify-center'>
          <button className='bg-gray-200 h-8 text-gray-800 px-2 py-1 mr-2 rounded flex justify-center items-center'>
            <UserPlus size={16} className='mr-2' />
            Share
          </button>
          <button className='hover:bg-gray-500 px-2 py-1 h-8 rounded'>
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>

      {/* Board Area */}
      <div className='flex flex-col w-full flex-grow overflow-hidden'>
        <div className='p-3 h-full overflow-x-auto overflow-y-hidden'>
          <DragDropContext onDragEnd={onDragEnd}>
            <div className='flex flex-nowrap space-x-3 h-full'>
              {bdata.list &&
                bdata.list.map((x, ind) => (
                  <div key={ind} className='w-60 h-fit rounded-md p-2 bg-black flex-shrink-0'>
                    <div className='list-body'>
                      <div className='flex justify-between p-1'>
                        <span>{x.title}</span>
                        <button className='hover:bg-gray-500 p-1 rounded-sm'>
                          <MoreHorizontal size={16} />
                        </button>
                      </div>
                      <Droppable droppableId={x.id}>
                        {(provided, snapshot) => (
                          <div
                            className='py-1 space-y-2'
                            ref={provided.innerRef}
                            style={{ backgroundColor: snapshot.isDraggingOver ? '#222' : 'transparent' }}
                            {...provided.droppableProps}
                          >
                            {x.items &&
                              x.items.map((item, index) => {
                                const isEditing = editingId === item.id;
                                return (
                                  <Draggable key={item.id} draggableId={item.id} index={index}>
                                    {(provided, snapshot) => (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                      >
                                        <div className='item flex justify-between items-center bg-zinc-700 p-1 cursor-pointer rounded-md border-2 border-zinc-900 hover:border-gray-500'>
                                          {isEditing ? (
                                            <input
                                              className='bg-zinc-800 text-white px-2 py-1 rounded w-full mr-2'
                                              value={editText}
                                              onChange={(e) => setEditText(e.target.value)}
                                              onKeyDown={(e) => {
                                                if (e.key === 'Enter') handleSaveEdit(ind, index);
                                                if (e.key === 'Escape') setEditingId(null);
                                              }}
                                              autoFocus
                                            />
                                          ) : (
                                            <span>{item.title}</span>
                                          )}
                                          <span className='flex justify-start items-start'>
                                            {isEditing ? (
                                              <button
                                                className='hover:bg-green-700 p-1 rounded-sm ml-2'
                                                onClick={() => handleSaveEdit(ind, index)}
                                              >
                                                <Check size={16}></Check>
                                              </button>
                                            ) : (
                                              <button
                                                className='hover:bg-gray-600 p-1 rounded-sm ml-2'
                                                onClick={() => {
                                                  setEditingId(item.id);
                                                  setEditText(item.title);
                                                }}
                                              >
                                                <Edit2 size={16} />
                                              </button>
                                            )}
                                          </span>
                                        </div>
                                      </div>
                                    )}
                                  </Draggable>
                                );
                              })}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                      <CardAdd getcard={(e) => cardData(e, ind)} />
                    </div>
                  </div>
                ))}
              <AddList getlist={listData} />
            </div>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
};

export default Main;
