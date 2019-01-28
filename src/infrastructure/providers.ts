const REPOSITORY_PROVIDERS = {
  ISongRepository: Symbol.for("ISongRepository"),
  IUserRepository: Symbol.for("IUserRepository"),
  IPlayerRepository: Symbol.for("IPlayerRepository")
};

const SERVICE_PROVIDERS = {
  IPlayerService: Symbol.for("IPlayerService"),
};

export { REPOSITORY_PROVIDERS, SERVICE_PROVIDERS  };
