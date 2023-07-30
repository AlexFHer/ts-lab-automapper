import { Profile } from "./profile";

interface TaskDTO {
  id: number;
  name: string;
}

interface Task {
  id: number;
  name: string;
  taskUniqueId: string;
}

describe('Profile', () => {

  it('should be truthy', () => {
    expect(new Profile({})).toBeTruthy();
  });

  it('should generate for member function correctly', () => {
    const taskInitialState = {
      id: 0,
      name: '',
      taskUniqueId: ''
    }

    const profile = new Profile<TaskDTO, Task>(taskInitialState)
      .forMember('taskUniqueId', (source) => source.id + '-' + source.name)

    expect(typeof profile.getInitialState().taskUniqueId).toBe('function');
  });

});
