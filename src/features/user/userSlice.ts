import {
  createSlice,
  createSelector,
  createEntityAdapter,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { StateType, ActionType } from "../../utils/types";
import { UserEntity } from "./userType";

import {
  fetchUserApi,
  createNewUserApi,
  deleteUserApi,
  updateUserApi,
} from "./userAPI";

const userAdapter = createEntityAdapter();

const initialState: StateType = userAdapter.getInitialState({
  status: "idle",
  fetchStatus: "idle",
  createStatus: "idle",
  deleteStatus: "idle",
  updateStatus: "idle",
});

export const fetchUser = createAsyncThunk(
  "templates/fetchUser",
  async (userId: string) => {
    try {
      const response = await fetchUserApi(userId);
      return response.data;
    } catch (e) {
      console.error("::Error occurred while fetching user::");
      throw e;
    }
  }
);

export const createNewUser = createAsyncThunk(
  "templates/createNewUser",
  async (newUser: UserEntity) => {
    try {
      const response: any = await createNewUserApi(newUser);
      return response.data;
    } catch (e) {
      console.error("::Error occurred while creating new user::");
      throw e;
    }
  }
);

export const updateUser = createAsyncThunk(
  "templates/updateUser",
  async (newValues: any) => {
    const { userId, user } = newValues;
    try {
      const response: any = await updateUserApi(userId, user);
      return response.data;
    } catch (e) {
      console.error("::Error occurred while updating user::");
      throw e;
    }
  }
);

export const deleteUser = createAsyncThunk(
  "templates/deleteUser",
  async (userId: string) => {
    try {
      const response: any = await deleteUserApi(userId);
      return response.data;
    } catch (e) {
      console.error("::Error occurred while deleting user::");
      throw e;
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // templatesLoading(state) {
    //   state.status = "loading";
    // },
    // templateIdleStatus(state) {
    //   state.status = "idle";
    // },
    createTemplateStatus(state, status: any) {
      state.createStatus = status;
    },
    // templateAdded(state: StateType, action: ActionType) {
    //   const template = action.payload;
    //   state.entities[template.id] = template;
    // },
    // templatesLoaded(state, action) {
    //   const newEntities: TemplateEntity = {} as TemplateEntity;
    //   action.payload.forEach((template: any) => {
    //     newEntities[template.id] = template;
    //   });
    //   state.entities = newEntities;
    //   state.status = "idle";
    // },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(fetchUser.pending, (state: StateType, action: ActionType) => {
        state.fetchStatus = "loading";
      })
      .addCase(fetchUser.fulfilled, (state: StateType, action: ActionType) => {
        userAdapter.setOne(state, action.payload);
        state.fetchStatus = "succeeded";
      })
      .addCase(fetchUser.rejected, (state: StateType, action: ActionType) => {
        state.fetchStatus = "failed";
      })
      .addCase(
        createNewUser.pending,
        (state: StateType, action: ActionType) => {
          state.createStatus = "loading";
        }
      )
      .addCase(
        createNewUser.fulfilled,
        (state: StateType, action: ActionType) => {
          userAdapter.addOne(state, action.payload);
          state.createStatus = "succeeded";
        }
      )
      .addCase(
        createNewUser.rejected,
        (state: StateType, action: ActionType) => {
          state.createStatus = "failed";
        }
      )
      .addCase(deleteUser.pending, (state: StateType, action: ActionType) => {
        state.deleteStatus = "loading";
      })
      .addCase(deleteUser.fulfilled, (state: StateType, action: ActionType) => {
        userAdapter.removeOne(state, action.payload.id);
        state.deleteStatus = "succeeded";
      })
      .addCase(deleteUser.rejected, (state: StateType, action: ActionType) => {
        state.deleteStatus = "failed";
      });
  },
});

export const { selectAll: selectTemplates, selectById: selectTemplateById } =
  userAdapter.getSelectors((state: any) => state.templates);

export const selectTemplateIds = createSelector(selectTemplates, (templates) =>
  templates.map((template: any) => template.id)
);

export const selectState = (state: any) => state.templates;

export const selectStatus = (state: any) => state.templates.status;

export const selectCreateStatus = (state: any) => state.templates.createStatus;

// export const {
//   templatesLoading,
//   templateIdleStatus,
//   templateAdded,
//   templatesLoaded,
//   createTemplateIdleStatus,
// } = usersSlice.actions;

export default usersSlice.reducer;
