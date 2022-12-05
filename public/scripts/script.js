const formElem = document.querySelector('#formElem');

formElem.onsubmit = async (e) => {
  e.preventDefault();

  const user_id = document.querySelector('#user_id').value;
  const roles   = document.querySelector('#roles').value;

  let response = await fetch(`http://localhost:3001/api/users/${user_id}/roles?roles=${roles}`, {
    method: 'POST',
  });
};
