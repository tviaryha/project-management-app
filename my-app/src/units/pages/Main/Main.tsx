import useCloseMenu from '../../../hooks/useCloseMenu';

const Main = () => {
  useCloseMenu();

  return <div>MainPage</div>;
};

export default Main;

// const TaskProps = {
//   _id: 'id',
//   title: 'titlebbbbbbbbbbbbb',
//   order: 1,
//   boardId: 'boardId',
//   columnId: 'columnId',
//   description: 'descriptionbbbbbbbbbbbbbbbbbb',
//   userId: 'userId',
//   users: ['userId']
// };

// const Main = () => {
//   useCloseMenu();

//   return (
//     <>
//       <Task {...TaskProps} />
//       <div>MainPage</div>
//     </>
//   );
// };

// export default Main;