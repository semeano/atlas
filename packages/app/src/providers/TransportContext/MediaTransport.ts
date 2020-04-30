import { Transport } from '@polkadot/joy-utils/index'
import { EntityId } from '@joystream/types/versioned-store'
import { VideoType } from './../../schemas/video/Video'
import { FeaturedContentType } from "./../../schemas/general/FeaturedContent"
import { ChannelEntity } from './../../entities/ChannelEntity'
import { isVideoChannel, isPublicChannel } from './../../channels/ChannelHelpers'

export interface ValidationConstraint {
  min: number
  max: number
}

export interface ChannelValidationConstraints {
  handle: ValidationConstraint
  title: ValidationConstraint
  description: ValidationConstraint
  avatar: ValidationConstraint
  banner: ValidationConstraint
}

export abstract class MediaTransport extends Transport {

  protected sessionId: number = 0

  clearSessionCache(): void {}

  openSession(): void {
    this.sessionId++
    console.info(`Open transport session no. ${this.sessionId}`)
  }

  closeSession(): void {
    this.clearSessionCache()
    console.info(`Close transport session no. ${this.sessionId}`)
  }

  async session<R>(operation: () => R): Promise<R> {
    if (typeof operation !== 'function') {
      throw new Error('Operation is not a function')
    }
    this.openSession()
    const res = await operation()
    this.closeSession()
    return res
  }

  abstract featuredContent(): Promise<FeaturedContentType | undefined>

  async videoById(id: EntityId): Promise<VideoType | undefined> {
    return (await this.allVideos())
      .find(x => id && id.eq(x.id))
  }

  abstract allVideos(): Promise<VideoType[]>

  async featuredVideos(): Promise<VideoType[]> {
    const content = await this.featuredContent()
    const videoIds = (content?.featuredVideos || []) as unknown as number[]
    const videos = await Promise.all(videoIds.map((id) =>
      this.videoById(new EntityId(id))))
    return videos.filter(x => x !== undefined) as VideoType[]
  }

  abstract allChannels(): Promise<ChannelEntity[]>

  async allVideoChannels(): Promise<ChannelEntity[]> {
    return (await this.allChannels())
      .filter(isVideoChannel)
  }

  async allPublicVideoChannels(): Promise<ChannelEntity[]> {
    return (await this.allVideoChannels())
      .filter(isPublicChannel)
      .sort(x => -1 * x.id)
  }

  async latestPublicVideoChannels(limit: number = 6): Promise<ChannelEntity[]> {
    return (await this.allPublicVideoChannels()).slice(0, limit)
  }

  protected abstract notImplementedYet<T> (): T

}
