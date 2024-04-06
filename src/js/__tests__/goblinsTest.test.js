import Field from '../Field';


test('создание игрового поля', () => {
  const field = new Field();
  const fields = field.gameField(4);
  const received = fields.querySelectorAll('.cell');
  expect(received.length).toBe(4 ** 2);
});
