import { provide, onUnmounted } from "vue-demi";
import { QueryClient } from "react-query/core";

import { VUE_QUERY_CLIENT } from "../src/useQueryClient";
import { useQueryProvider } from "../src/useQueryProvider";

jest.mock("react-query/core", () => ({
  QueryClient: jest.fn(),
}));

describe("useQueryProvider", () => {
  const provideSpy = provide as jest.Mock;
  const onUnmountedSpy = onUnmounted as jest.Mock;
  const queryClientSpy = QueryClient as jest.Mock;

  const mount = jest.fn();
  const unmount = jest.fn();
  const queryClientInstance = {
    mount,
    unmount,
  };
  queryClientSpy.mockImplementation(() => queryClientInstance);

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  test("should create new queryClient instance", () => {
    useQueryProvider();

    expect(queryClientSpy).toHaveBeenCalledTimes(1);
  });

  test("should call mount on QueryClient", () => {
    useQueryProvider();

    expect(mount).toHaveBeenCalledTimes(1);
  });

  test("should call provide with QueryClient", () => {
    useQueryProvider();

    expect(provideSpy).toHaveBeenCalledTimes(1);
    expect(provideSpy).toHaveBeenCalledWith(
      VUE_QUERY_CLIENT,
      queryClientInstance
    );
  });

  test("should call unmount on QueryClient", () => {
    onUnmountedSpy.mockImplementationOnce((fn) => fn());

    useQueryProvider();

    expect(unmount).toHaveBeenCalledTimes(1);
  });
});
