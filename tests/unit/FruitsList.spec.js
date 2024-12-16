import { shallowMount } from "@vue/test-utils";
import FruitsList from "@/modules/fruits-modules/pages/fruits-list/fruits-list.vue";
import { ApiService } from "@/modules/shared/services/api";

jest.mock("@/modules/shared/services/api");

describe("FruitsList.vue", () => {
  let wrapper;
  let mockApiResponse;

  beforeEach(() => {
    mockApiResponse = {
      data: [
        {
          id: 1,
          name: "Apple",
          image: "/images/apple.jpg",
          price: 1.5,
          description: "Fresh Apple",
          taste: "Sweet",
          expires: "2024-12-31",
          color: "#ff0000",
          isFruit: true,
        },
      ],
    };
    ApiService.prototype.get = jest.fn().mockResolvedValue(mockApiResponse);
    wrapper = shallowMount(FruitsList, {
      stubs: ["v-container", "v-row", "v-col", "v-btn", "v-data-table", "v-icon", "v-chip", "v-img", "v-progress-circular", "EmptyState", "Breadcrumb", "HeaderPage", "fruit-dialog", "confirm-dialog"],
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Get Fruit list on mount lifcycle => fruitsList", async () => {
    await wrapper.vm.getListData();
    expect(wrapper.vm.isLoading).toBe(false);
  });

  it("setting Loading while fetching data", async () => {
    const promise = wrapper.vm.getListData();
    expect(wrapper.vm.isLoading).toBe(true);
    await promise;
    expect(wrapper.vm.isLoading).toBe(false);
  });

  it("Handle Errors", async () => {
    ApiService.prototype.get.mockRejectedValueOnce(new Error("API Error"));
    await wrapper.vm.getListData();
    expect(wrapper.vm.fruitsList).toEqual([]);
    expect(wrapper.vm.isLoading).toBe(false);
  });
});
