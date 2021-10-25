const menuData =  [
    {
      name: "Storage",
      id: 0,
      icon: "warehouse.svg",
      ref: "/storage",
      subitems: []
    },
    {
      name: "Production",
      id: 1,
      icon: "manufacturing_black.svg",
      ref: "",
      subitems: [
        {
          name: "Production view",
          id: 11,
          icon: "conveyor-belt.svg",
          ref: "/production-view",
          subitems: []
        },
        {
          name: "Production planning",
          id: 12,
          icon: "machine.svg",
          ref: "/production-planning-view",
          subitems: []
        }
      ]
    },
    {
      name: "Orders",
      id: 2,
      icon: "order.svg",
      ref: "/orders",
      subitems: []
    },
    {
      name: "Workstations",
      id: 3,
      icon: "machine.svg",
      ref: "/workstations",
      subitems: []
    },
    {
      name: "Administration Panel",
      id: 4,
      icon: "settings.svg",
      ref: "/element/5",
      subitems: []
    }
  ]

  export default menuData