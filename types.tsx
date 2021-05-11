export type RootStackParamList = {
  Splash: undefined;
  PatientLogin: undefined;
  PatientLoginOrSignup: undefined;
  PatientSignUp: undefined;
  PatientDashboard: undefined;
  PatientTestResults: undefined;
  NurseLogin: undefined;
  NurseDashboard: undefined;
  NurseEditDetails: {itemId: number, token: string};
  NotFound: undefined;
  TabOne: undefined;
  MainScreen: undefined;
  NurseMain: undefined;
};

export type BottomTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
};

export type TabOneParamList = {
  TabOneScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};
