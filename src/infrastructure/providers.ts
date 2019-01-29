const REPOSITORY_PROVIDERS = {
  ISongRepository: Symbol.for("ISongRepository"),
  IUserRepository: Symbol.for("IUserRepository"),
  IPlayerRepository: Symbol.for("IPlayerRepository")
};

const SERVICE_PROVIDERS = {
  IPlayerService: Symbol.for("IPlayerService"),
  ISongService: Symbol.for("ISongService"),
};

export { REPOSITORY_PROVIDERS, SERVICE_PROVIDERS  };
