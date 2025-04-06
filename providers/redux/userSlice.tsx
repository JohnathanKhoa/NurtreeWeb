import { getMe, getUserAllPlaylists } from "@/lib/actions";
import { Playlist, User } from "@/types/types";
import { getAuthSession } from "@/util/serverUtils";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { redirect } from "next/navigation";

export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async () => {
    const session = await getAuthSession();
    if (!session) {
      redirect("/login");
    }
    const response = [];
    const res1 = await getMe({ session });
    response.push(res1);
    const res2 = await getUserAllPlaylists(session, 20);
    response.push(res2);
    return response;
  }
);

const userDataSlice = createSlice({
  name: "userData",
  initialState: {
    data: {
      user: {} as User,
      playlists: [] as Playlist[],
    },
    isLoading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.isLoading = false;
        const user = action.payload[0] as User;
        const playlists = action.payload[1] as Playlist[];
        state.data = { user, playlists };
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? null;
      });
  },
});

export default userDataSlice.reducer;
