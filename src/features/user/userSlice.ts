import {
  createSlice,
  createSelector,
  createEntityAdapter,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { StateType, ActionType } from "../../utils/types";
import { TemplateEntity } from "./templateTypes";
import {
  fetchTemplatesApi,
  saveNewTemplateApi,
  deleteTemplateApi,
  updateTemplateApi,
} from "./templatesAPI";

const templateAdapter = createEntityAdapter();

const initialState: StateType = templateAdapter.getInitialState({
  status: "idle",
  fetchStatus: "idle",
  createStatus: "idle",
  deleteStatus: "idle",
  updateStatus: "idle",
});

export const fetchTemplates = createAsyncThunk(
  "templates/fetchTemplates",
  async () => {
    try {
      const response = await fetchTemplatesApi();
      return response.data;
    } catch (e) {
      console.error("::Error occurred while fetching templates::");
      throw e;
    }
  }
);

export const saveNewTemplate = createAsyncThunk(
  "templates/saveNewTemplate",
  async (newTemplate: TemplateEntity) => {
    try {
      const response: any = await saveNewTemplateApi(newTemplate);
      return response.data;
    } catch (e) {
      console.error("::Error occurred while saving new template::");
      throw e;
    }
  }
);

export const updateTemplate = createAsyncThunk(
  "templates/updateTemplate",
  async (newValues: any) => {
    const { templateId, template } = newValues;
    try {
      const response: any = await updateTemplateApi(templateId, template);
      return response.data;
    } catch (e) {
      console.error("::Error occurred while updating template::");
      throw e;
    }
  }
);

export const deleteTemplate = createAsyncThunk(
  "templates/deleteTemplate",
  async (templateId: string) => {
    try {
      const response: any = await deleteTemplateApi(templateId);
      return response.data;
    } catch (e) {
      console.error("::Error occurred while deleting template::");
      throw e;
    }
  }
);

const templatesSlice = createSlice({
  name: "templates",
  initialState,
  reducers: {
    templatesLoading(state) {
      state.status = "loading";
    },
    templateIdleStatus(state) {
      state.status = "idle";
    },
    createTemplateIdleStatus(state) {
      state.createStatus = "idle";
    },
    templateAdded(state: StateType, action: ActionType) {
      const template = action.payload;
      state.entities[template.id] = template;
    },
    templatesLoaded(state, action) {
      const newEntities: TemplateEntity = {} as TemplateEntity;
      action.payload.forEach((template: any) => {
        newEntities[template.id] = template;
      });

      state.entities = newEntities;
      state.status = "idle";
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(
        fetchTemplates.pending,
        (state: StateType, action: ActionType) => {
          state.status = "loading";
        }
      )
      .addCase(
        fetchTemplates.fulfilled,
        (state: StateType, action: ActionType) => {
          templateAdapter.setAll(state, action.payload);
          state.status = "idle";
        }
      )
      .addCase(
        fetchTemplates.rejected,
        (state: StateType, action: ActionType) => {
          state.status = "failed";
          throw new Error("Could not fetch templates");
        }
      )
      .addCase(
        saveNewTemplate.pending,
        (state: StateType, action: ActionType) => {
          state.status = "loading";
          state.createStatus = "loading";
        }
      )
      .addCase(
        saveNewTemplate.fulfilled,
        (state: StateType, action: ActionType) => {
          templateAdapter.addOne(state, action.payload);
          state.status = "succeeded";
          state.createStatus = "succeeded";
        }
      )
      .addCase(
        saveNewTemplate.rejected,
        (state: StateType, action: ActionType) => {
          state.status = "idle";
          state.createStatus = "failed";
        }
      )
      .addCase(
        deleteTemplate.pending,
        (state: StateType, action: ActionType) => {
          state.status = "loading";
        }
      )
      .addCase(
        deleteTemplate.fulfilled,
        (state: StateType, action: ActionType) => {
          templateAdapter.removeOne(state, action.payload.id);
          state.status = "succeeded";
        }
      )
      .addCase(
        deleteTemplate.rejected,
        (state: StateType, action: ActionType) => {
          state.status = "idle";
          throw new Error("Could not delete template");
        }
      );
  },
});

export const { selectAll: selectTemplates, selectById: selectTemplateById } =
  templateAdapter.getSelectors((state: any) => state.templates);

export const selectTemplateIds = createSelector(selectTemplates, (templates) =>
  templates.map((template: any) => template.id)
);

export const selectState = (state: any) => state.templates;

export const selectStatus = (state: any) => state.templates.status;

export const selectCreateStatus = (state: any) => state.templates.createStatus;

export const {
  templatesLoading,
  templateIdleStatus,
  templateAdded,
  templatesLoaded,
  createTemplateIdleStatus,
} = templatesSlice.actions;

export default templatesSlice.reducer;
